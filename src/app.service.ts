import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class AppService  implements OnModuleInit{
  getHello(): string {
    return 'Hello World!';
  }

  async onModuleInit(): Promise<void> {
    //const exchanger = new Exchanger(ABI, process.env.BC_WS,process.env.SC_ADDRESS);
    //console.log('Subscribe event'); // to do...save data
    //exchanger.listenOnTransfer();
  }
  
}
