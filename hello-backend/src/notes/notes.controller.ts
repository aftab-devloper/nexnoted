import { Controller, Get, Post, Put, Delete, Body, Param, Request, UseGuards } from '@nestjs/common';
import { NotesService } from './notes.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('notes')
@UseGuards(AuthGuard('jwt'))
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  findAll(@Request() req: any) {
    return this.notesService.findAll(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notesService.findOne(+id);
  }

  @Post()
  create(@Body() body: { title: string; content: string }, @Request() req: any) {
    return this.notesService.create(body, req.user.userId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: { title: string; content: string }) {
    return this.notesService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notesService.remove(+id);
  }
}