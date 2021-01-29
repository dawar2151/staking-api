import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lock } from './lock.entity';
import { CreateLockDto } from './dto/create-lock.dto';
import { UpdateLockDto } from './dto/update-lock.dto';
import Exchanger from 'src/utils/exchanger.utils';


@Injectable()
export class LocksService implements OnModuleInit{
  constructor(
    @InjectRepository(Lock)
    private locksRepository: Repository<Lock>,
  ) { }
  onModuleInit() {
    const exchanger = new Exchanger();
    console.log("listening for logLockedTokens on ");
    let self = this;
    // watch for changes
    exchanger.getSc().events.logLockedTokens(function(error, result){ //This is where events can trigger changes in UI
      if (!error){
        console.log(result);
        const eventData = result.returnValues;
        const lock = new Lock();
        lock.holder = eventData.holder;
        lock.amountLocked = parseInt(eventData.amountLocked);
        lock.stakeId = parseInt(eventData.stakeId)
        const res = self.locksRepository.save(lock); 
        console.log(res);
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
    lock.stakeId = createLockDto.stakeId
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
  find(req): Promise<Lock | undefined> {
    return this.locksRepository.findOne(req);
  }
  /**
   * @dev remove lock
   * @param id 
   */
  async remove(id: string): Promise<void> {
    await this.locksRepository.delete(id);
  }
}
