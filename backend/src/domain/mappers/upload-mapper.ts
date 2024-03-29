import type { Upload } from '#domain/entities/upload.js'
import type { Upload as PrismaUpload } from '@prisma/client'
import { FileMapper } from './file-mapper.js'

export class UploadMapper {
  constructor(private readonly props: Upload) {}

  public toPrisma(): PrismaUpload {
    return {
      id: this.props.id,
      title: this.props.title,
      message: this.props.message,
      name: this.props.name,
      originalName: this.props.originalName,
      mimetype: this.props.mimetype,
      path: this.props.path,
      size: this.props.size,
      expiresAt: this.props.expiresAt,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    }
  }

  public toHttp() {
    return {
      id: this.props.id,
      title: this.props.title,
      message: this.props.message,
      name: this.props.originalName,
      mimetype: this.props.mimetype,
      size: this.props.size,
      expiresAt: this.props.expiresAt,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,

      files: this.props.files.map(file => new FileMapper(file).toHttp()),
    }
  }
}
