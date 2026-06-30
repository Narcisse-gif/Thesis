import { join } from 'path';

export function getUploadRootPath() {
  return process.env.UPLOAD_ROOT || join(process.cwd(), 'uploads');
}

export function getUploadFolder(...segments: string[]) {
  return join(getUploadRootPath(), ...segments);
}
