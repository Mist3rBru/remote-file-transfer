/* eslint-disable security/detect-non-literal-fs-filename */
import { File } from '#domain/entities/file.js'
import { Injectable } from '@nestjs/common'
import archiver from 'archiver'
import { randomUUID } from 'node:crypto'
import { createReadStream, createWriteStream } from 'node:fs'
import { join, resolve } from 'node:path'

@Injectable()
export class ArchiverAdapter {
  constructor(private readonly zipFolderPath: string) {}

  async zip(files: File.Params[]): Promise<File> {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const zipFileName = randomUUID().replaceAll('-', '')
    const zip = new File({
      name: zipFileName,
      originalName: 'remote-file-transfer.zip',
      path: join(this.zipFolderPath, zipFileName),
      mimetype: 'application/zip',
      size: 0,
    })

    const zipStream = createWriteStream(zip.path)
    zipStream.on('error', err => {
      throw err
    })

    const archive = archiver('zip', { zlib: { level: 9 } })
    archive.pipe(zipStream)

    for (const file of files) {
      archive.append(createReadStream(resolve(file.path)), {
        name: file.originalName,
      })
    }

    await archive.finalize()

    return zip
  }
}
