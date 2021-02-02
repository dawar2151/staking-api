import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lock } from './lock.entity';
import { CreateLockDto } from './dto/create-lock.dto';
import { UpdateLockDto } from './dto/update-lock.dto';
import Exchanger from 'src/utils/exchanger.utils';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';


@Injectable()
export class LocksService implements OnModuleInit{
  constructor(
    @InjectRepository(Lock)
    private locksRepository: Repository<Lock>,
    private usersService: UsersService
  ) { }
   onModuleInit() {
    const exchanger = new Exchanger();
    console.log("listening for logLockedTokens on ");
    let self = this;
    // watch for changes
    exchanger.getSc().events.logLockedTokens(function(error, result){ //This is where events can trigger changes in UI
      console.log(result);
      if (!error){
        const eventData = result.returnValues;
        const lock = new Lock();
        lock.holder = eventData.holder;
        lock.amountLocked = parseInt(eventData.amountLocked);
        lock.stakeNum = parseInt(eventData.stakeNum);
        lock.timeLocked = parseInt(eventData.timeLocked)
        const res = self.locksRepository.save(lock);
        self.usersService.validateLock(eventData.holder, eventData.amountLocked); 
      }
    });
  }
  /**
   * Save lock
   * @param createLockDto 
   */
  create(createLockDto: CreateLockDto): Promise<Lock> {
    const lock = new Lock();
    lock.holder = createLockDto.holder;
    lock.amountLocked = createLockDto.amountLocked;
    lock.stakeNum = createLockDto.stakeId
    return this.locksRepository.save(lock);

  }
  /**
   * @dev 
   * @param updateMetaTagDto 
   */
  async update(updateLockDto: UpdateLockDto): Promise<any> {
    return this.locksRepository.update(updateLockDto.id, updateLockDto);
  }
  /**
   * @dev Get all metaTags
   */
  findAll(): Promise<Lock[]> {
    return this.locksRepository.find()
  }
  /**
   * @dev Get lock by id
   * @param id 
   */
  findOne(id: number): Promise<Lock> {
    return this.locksRepository.findOne(id);
  }
  /**
   * @dev Find lock by query
   * @param req Get lock by query
   */
  find(req): Promise<Lock[]| undefined> {
    return this.locksRepository.find(req);
  }
  /**
   * @dev remove lock
   * @param id 
   */
  async remove(id: string): Promise<void> {
    await this.locksRepository.delete(id);
  }
}
