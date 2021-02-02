import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import Exchanger from 'src/utils/exchanger.utils';


@Injectable()
export class UsersService implements OnModuleInit{
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }
  onModuleInit() {

  }
  async validateLock(address, amount){
        const user = await this.findOne({address: address});
        if(!user){
          let newUser = new User()
          newUser.address = address;
          newUser.lockedAmount = amount;
          this.create(newUser);
        }else{
          user.lockedAmount +=parseInt(amount);
          this.update(user);
        } 
  }
  async sendRewards(){
    const exchanger =  new Exchanger();
    const users = await this.findAll();
    for(let user of users){
      const reward = await exchanger.getReward(user.address);
      console.log(user);
      console.log(reward);
      user.Layerx = String(reward[0]);
      user.eth = String(reward[1]);
      this.update(user);
    }
  }
  async validateUnlock(address, amount){
    const user = await this.findOne({address: address});
    if(user){
      user.lockedAmount -= parseInt(amount);
      this.update(user);
    } 
  }
  async validateWithdraw(address){
    const user = await this.findOne({address});
    if(user){
      user.Layerx = '0';
      user.eth = '0';
      this.update(user);
    } 
  }
  /**
   * Save user
   * @param createUserDto 
   */
  async create(user: User): Promise<User> {
      return this.usersRepository.save(user);
  }
  /**
   * @dev 
   * @param updateMetaTagDto 
   */
  async update(user: User): Promise<any> {
    return this.usersRepository.update(user.id, user);
  }
  /**
   * @dev Get all metaTags
   */
  findAll(): Promise<User[]> {
    return this.usersRepository.find()
  }
  /**
   * @dev Get user by id
   * @param id 
   */
  findOne(req): Promise<User> {
    return this.usersRepository.findOne(req);
  }
  /**
   * @dev Find user by query
   * @param req Get user by query
   */
  find(req): Promise<User[]| undefined> {
    return this.usersRepository.find(req);
  }
  /**
   * @dev remove user
   * @param id 
   */
  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
