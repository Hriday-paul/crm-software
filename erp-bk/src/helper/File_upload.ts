import multer from 'multer';
import path from 'node:path';

export const File_Upload = () => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join('public', 'images'));
        },
        filename: function (req, file, cb) {
            //original name helps us to get the file extension
            cb(null, Date.now() + "-" + file.originalname);
        },
    });
    return multer({ storage: storage });
}