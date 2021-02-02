import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stake } from './stake.entity';
import Exchanger from 'src/utils/exchanger.utils';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class StakesService implements OnModuleInit{
  constructor(
    @InjectRepository(Stake)
    private stakesRepository: Repository<Stake>,
    private usersService: UsersService
  ) { }
  onModuleInit() {
    const exchanger = new Exchanger();
    const self = this;
    console.log('listening for close stake on');
    exchanger.getSc().events.logCloseStake(function (error, result){
        console.log(result);
        if(!error){
          const eventData = result.returnValues;
          self.saveStake(eventData);
          self.usersService.sendRewards();
        }
        
    })
  }
  async saveStake(eventData){
    const exchanger = new Exchanger();
    const stake = await exchanger.getStake(eventData.stakeNum);
    console.log(stake);
    let newStake =  new Stake();
    newStake.start = stake[0];
    newStake.end = stake[1];
    newStake.layerLockedTotal = stake[2];
    newStake.layerx = String(stake[3]);
    newStake.eth = String(stake[4]);
    newStake.timeClosed = eventData.timeClosed;
    this.stakesRepository.save(newStake);
  }
  /**
   * Save stake
   * @param createStakeDto 
   */
  async create(stake: Stake): Promise<Stake> {
      return this.stakesRepository.save(stake);
  }
  /**
   * @dev 
   * @param updateMetaTagDto 
   */
  async update(stake: Stake): Promise<any> {
    return this.stakesRepository.update(stake.id, stake);
  }
  /**
   * @dev Get all metaTags
   */
  findAll(): Promise<Stake[]> {
    return this.stakesRepository.find()
  }
  /**
   * @dev Get stake by id
   * @param id 
   */
  findOne(req): Promise<Stake> {
    return this.stakesRepository.findOne(req);
  }
  /**
   * @dev Find stake by query
   * @param req Get stake by query
   */
  find(req): Promise<Stake[]| undefined> {
    return this.stakesRepository.find(req);
  }
  /**
   * @dev remove stake
   * @param id 
   */
  async remove(id: string): Promise<void> {
    await this.stakesRepository.delete(id);
  }
}
