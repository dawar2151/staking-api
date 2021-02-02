import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Withdraw } from './withdraw.entity';
import { CreateWithdrawDto } from './dto/create-withdraw.dto';
import { UpdateWithdrawDto } from './dto/update-withdraw.dto';
import Exchanger from 'src/utils/exchanger.utils';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class WithdrawsService implements OnModuleInit{
  constructor(
    @InjectRepository(Withdraw)
    private withdrawsRepository: Repository<Withdraw>,
    private usersService: UsersService
  ) { }
  onModuleInit() {
    const exchanger = new Exchanger();
    console.log("listening for logWithdraw on ");
    let self = this;
    // watch for changes
    exchanger.getSc().events.logWithdraw(function(error, result){ //This is where events can trigger changes in UI
      if (!error){
        console.log(result);
        const eventData = result.returnValues;
        const withdraw = new Withdraw();
        withdraw.holder = eventData.holder;
        withdraw.eth = parseInt(eventData.eth);
        withdraw.layerx = parseInt(eventData.layerx);
        withdraw.stakeId = parseInt(eventData.stakeId)
        const res = self.withdrawsRepository.save(withdraw); 
        self.usersService.validateWithdraw(eventData.holder);
      }
        
    });
  }
  /**
   * @dev 
   * @param updateMetaTagDto 
   */
  async update(updateWithdrawDto: UpdateWithdrawDto): Promise<any> {
    return this.withdrawsRepository.update(updateWithdrawDto.id, updateWithdrawDto);
  }
  /**
   * @dev Get all metaTags
   */
  findAll(): Promise<Withdraw[]> {
    return this.withdrawsRepository.find()
  }
  /**
   * @dev Get withdraw by id
   * @param id 
   */
  findOne(id: number): Promise<Withdraw> {
    return this.withdrawsRepository.findOne(id);
  }
  /**
   * @dev Find withdraw by query
   * @param req Get withdraw by query
   */
  find(req): Promise<Withdraw | undefined> {
    return this.withdrawsRepository.findOne(req);
  }
  /**
   * @dev remove withdraw
   * @param id 
   */
  async remove(id: string): Promise<void> {
    await this.withdrawsRepository.delete(id);
  }
}
