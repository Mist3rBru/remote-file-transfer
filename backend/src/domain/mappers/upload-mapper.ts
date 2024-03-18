import type { Upload } from '#domain/entities/upload.js'
import type { Upload as PrismaUpload } from '@prisma/client'

export class UploadMapper {
  constructor(private readonly props: Upload) {}

  public toPrisma(): PrismaUpload {
    return {
      id: this.props.id,
      title: this.props.title,
      message: this.props.message,
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
      size: this.props.size,
      expiresAt: this.props.expiresAt,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    }
  }
}