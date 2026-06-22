import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AiService } from './ai.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('ai')
@UseGuards(AuthGuard('jwt'))
export class AiController {
  constructor(private aiService: AiService) {}

  @Post('improve')
  improve(@Body() body: { content: string }) {
    return this.aiService.improveNote(body.content);
  }

  @Post('summarize')
  summarize(@Body() body: { content: string }) {
    return this.aiService.summarizeNote(body.content);
  }

  @Post('title')
  title(@Body() body: { content: string }) {
    return this.aiService.suggestTitle(body.content);
  }
}