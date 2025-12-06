import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { PrismaService } from 'src/helpers/prisma/prisma.service';
import { ApiResponse } from 'src/helpers/apiRespons';
import { IQuery } from 'src/helpers/type';
import { Prisma } from '@prisma/client';
import { Pagination } from 'src/helpers/pagination';

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateGroupDto, authorId: number) {
    const { members, ...data } = dto;

    const groupCheck = await this.prisma.group.findUnique({
      where: { nickname: dto.nickname },
    });
    if (groupCheck) throw new BadRequestException('nickname exists');

    const group = await this.prisma.group.create({
      data: { ...data, authorId },
    });

    const membersData = (
      await Promise.all(
        members.map(async (el) => {
          const check = await this.prisma.user.findUnique({
            where: { id: el, status: true },
          });
          if (!check || check.id === authorId) return;

          return {
            groupId: group.id,
            userId: el,
          };
        }),
      )
    ).filter(Boolean);

    await this.prisma.groupMember.createMany({
      data: membersData,
    });

    return new ApiResponse(group);
  }

  async findMine(id: number, { limit, page }: IQuery) {
    const where: Prisma.GroupWhereInput = {
      status: true,
      OR: [
        {
          members: { some: { userId: id } },
        },
        {
          authorId: id,
        },
      ],
    };

    const count = await this.prisma.group.count({ where });
    const pagination = new Pagination(count, page, limit);

    const group = await this.prisma.group.findMany({
      where,
      take: pagination.take,
      skip: pagination.skip,
      orderBy: { createdAt: 'desc' },
      omit: { authorId: true },
    });

    return new ApiResponse(group, pagination);
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return `This action updates a #${id} group`;
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
}
