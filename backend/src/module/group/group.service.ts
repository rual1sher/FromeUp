import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { PrismaService } from 'src/helpers/prisma/prisma.service';
import { ApiResponse } from 'src/helpers/apiRespons';
import { IQuery } from 'src/helpers/type';
import { Prisma } from '@prisma/client';
import { Pagination } from 'src/helpers/pagination';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class GroupService {
  constructor(
    private prisma: PrismaService,
    private files: UploadService,
  ) {}

  async create(dto: CreateGroupDto, authorId: number) {
    const { members, ...data } = dto;

    const groupCheck = await this.prisma.group.findUnique({
      where: { nickname: dto.nickname },
    });
    if (groupCheck) throw new BadRequestException('nickname exists');

    const image = this.files.saveFile(data.image);
    const banner = this.files.saveFile(data.banner);

    const group = await this.prisma.group.create({
      data: { ...data, image, banner, authorId },
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

  async info(id: number) {
    if (!id) throw new BadRequestException('ID Involid');

    const group = await this.prisma.group.findUnique({
      where: { id, status: true },
      include: {
        author: { omit: { password: true } },
        members: { select: { userId: true } },
      },
    });

    if (!group) throw new NotFoundException('group not found');

    const members = await this.prisma.groupMember.findMany({
      where: { id: { in: group.members.map((el) => el.userId) } },
    });

    return new ApiResponse({ ...group, members });
  }

  async update(id: number, dto: UpdateGroupDto) {
    const group = await this.prisma.group.findUnique({
      where: { status: true, id },
    });
    if (!group) throw new NotFoundException('group not found');

    const { members, ...data } = dto;

    if (data?.nickname) {
      const checkGroup = await this.prisma.group.findUnique({
        where: { nickname: data.nickname },
      });
      if (checkGroup) throw new BadRequestException('nickname exists');
    }

    const updateGroup = await this.prisma.group.update({ where: { id }, data });
    return new ApiResponse(updateGroup);
  }

  async remove(id: number) {
    const group = await this.prisma.group.findUnique({
      where: { id, status: true },
    });

    if (!group) throw new NotFoundException('group not found');

    const data = await this.prisma.group.update({
      where: { id },
      data: { status: false },
    });

    return new ApiResponse(data);
  }
}
