import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOperation, ApiParam, ApiProperty, ApiTags } from '@nestjs/swagger';
import { appendFile } from 'fs';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@ApiTags('board')
@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  private logger = new Logger('BoardsController');
  constructor(private boardsService: BoardsService) {}

  @ApiOperation({summary: 'get board for logined user'})
  @Get()
  getAllBoard(
    @GetUser() user: User
  ): Promise<Board[]> {
    this.logger.verbose(`User ${user.username} trying to get all boards`);
    return this.boardsService.getAllBoards(user);
  }

  // @Get()
  // getAllBoard(): Board[] {
  //   return this.boardsService.getAllBoards();
  // }

  @ApiOperation({summary: 'create board information'})
  @Post()
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User
  ): Promise<Board> {
    this.logger.debug(`User ${user.username} createing a new board. Payload: ${JSON.stringify(createBoardDto)}`);
    this.logger.verbose(`User ${user.username} createing a new board. Payload: ${createBoardDto}`);
    return this.boardsService.createBoard(createBoardDto, user);
  }

  // @Post()
  // @UsePipes(ValidationPipe)
  // createBoard(
  //   @Body() createBoardDto: CreateBoardDto
  // ): Board {
  //   return this.boardsService.createBoard(createBoardDto);
  // }

  @ApiOperation({summary: 'get board information by id'})
  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  // @Get('/:id')
  // getBoardById(@Param('id') id): Board {
  //   return this.boardsService.getBoardById(id);
  // }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'board id for deleting'
  })
  @ApiOperation({summary: 'delete board by id'})
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

  @ApiParam({
    name: 'id',
    required: true,
    description: 'board id for updating status'
  })
  @ApiBody({
    schema: {
      properties: {
        'status': { 
          type: 'string',
          example: 'PRIVATE' 
        }
      }
    }
  })
  @ApiOperation({summary: 'update board status either public or private by parameter id and formbody status'})
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
