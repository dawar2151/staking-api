import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stake } from './stake.entity';


@Injectable()
export class StakesService implements OnModuleInit{
  constructor(
    @InjectRepository(Stake)
    private stakesRepository: Repository<Stake>,
  ) { }
  onModuleInit() {

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
