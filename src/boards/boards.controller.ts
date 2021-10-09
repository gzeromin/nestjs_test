import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {

  constructor(private boardsService: BoardsService) {}

  @Get()
  getAllBoard(
    @GetUser() user: User
  ): Promise<Board[]> {
    return this.boardsService.getAllBoards(user);
  }

  // @Get()
  // getAllBoard(): Board[] {
  //   return this.boardsService.getAllBoards();
  // }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User
  ): Promise<Board> {
    return this.boardsService.createBoard(createBoardDto, user);
  }

  // @Post()
  // @UsePipes(ValidationPipe)
  // createBoard(
  //   @Body() createBoardDto: CreateBoardDto
  // ): Board {
  //   return this.boardsService.createBoard(createBoardDto);
  // }

  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  // @Get('/:id')
  // getBoardById(@Param('id') id): Board {
  //   return this.boardsService.getBoardById(id);
  // }

  @Delete('/:id')
  deleteBoard(
    @Param('id', ParseIntPipe) id,
    @GetUser() user: User): Promise<void> {
    return this.boardsService.deleteBoard(id, user);
  }

  // @Delete('/:id')
  // deleteBoard(@Param('id') id: string): void {
  //   this.boardsService.deleteBoard(id);
  // }

  @Patch('/:id/status')
  updateBaordStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<Board> {
    return this.boardsService.updateBoardStatus(id, status);
  }

  // @Patch('/:id/status')
  // updateBaordStatus(
  //   @Param('id') id: string,
  //   @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  // ): Board {
  //   return this.boardsService.updateBoardStatus(id, status);
  // }

}
