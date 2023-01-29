import { Controller, Get, StreamableFile, Res, Header } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import type { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  getHello(): string {
    return this.appService.getHello();
  }

  // @Get()
  // @Header('Content-Type', 'application/json')
  // @Header('Content-Disposition', 'attachment; filename="res.json"')
  // getStaticFile(): StreamableFile {
  //   const file = createReadStream(join(process.cwd(), 'res.json'));
  //   return new StreamableFile(file);
  // }  

}
