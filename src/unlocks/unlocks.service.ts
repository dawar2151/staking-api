import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Unlock } from './unlock.entity';
import { CreateUnlockDto } from './dto/create-unlock.dto';
import { UpdateUnlockDto } from './dto/update-unlock.dto';
import Exchanger from 'src/utils/exchanger.utils';


@Injectable()
export class UnlocksService implements OnModuleInit{
  constructor(
    @InjectRepository(Unlock)
    private unlocksRepository: Repository<Unlock>,
  ) { }
  onModuleInit() {
    const exchanger = new Exchanger();
    console.log("listening for logUnlockedTokens on ");
    let self = this;
    // watch for changes
    exchanger.getSc().events.logUnlockedTokens(function(error, result){ //This is where events can trigger changes in UI
      if (!error){
        console.log(result);
        const eventData = result.returnValues;
        const unlock = new Unlock();
        unlock.holder = eventData.holder;
        unlock.amountUnlocked = parseInt(eventData.amountUnlocked);
        const res = self.unlocksRepository.save(unlock); 
        console.log(res);
      }
        
    });
  }
  /**
   * @dev 
   * @param updateMetaTagDto 
   */
  async update(updateUnlockDto: UpdateUnlockDto): Promise<any> {
    return this.unlocksRepository.update(updateUnlockDto.id, updateUnlockDto);
  }
  /**
   * @dev Get all metaTags
   */
  findAll(): Promise<Unlock[]> {
    return this.unlocksRepository.find()
  }
  /**
   * @dev Get unlock by id
   * @param id 
   */
  findOne(id: number): Promise<Unlock> {
    return this.unlocksRepository.findOne(id);
  }
  /**
   * @dev Find unlock by query
   * @param req Get unlock by query
   */
  find(req): Promise<Unlock | undefined> {
    return this.unlocksRepository.findOne(req);
  }
  /**
   * @dev remove unlock
   * @param id 
   */
  async remove(id: string): Promise<void> {
    await this.unlocksRepository.delete(id);
  }
}
