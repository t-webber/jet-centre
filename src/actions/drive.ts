'use server';

import { google } from 'googleapis';
import { auth } from './auth';
import { File } from '@/lib/drive';

export async function getFileIds(): Promise<string[]> {
    const session = await auth();

    const googleAuth = new google.auth.OAuth2({
        clientId: process.env.AUTH_GOOGLE_ID,
        clientSecret: process.env.AUTH_GOOGLE_SECRET,
    });

    googleAuth.setCredentials({
        access_token: session?.user.access_token,
        refresh_token: session?.user.refresh_token,
    });

    const drive = google.drive({ version: 'v3', auth: googleAuth });

    return drive.files
        .list({
            pageSize: 10,
            q: "mimeType = 'application/vnd.google-apps.folder'",
        })
        .then(
            (req) =>
                req.data.files?.map((file) => file.id ?? null).filter((id) => id !== null) || []
        );
}

export async function getFiles(fileIds: string[]): Promise<Promise<File>[]> {
    return auth().then((session) => {
        const googleAuth = new google.auth.OAuth2({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        });

        googleAuth.setCredentials({
            access_token: session?.user.access_token,
            refresh_token: session?.user.refresh_token,
        });

        const drive = google.drive({ version: 'v3', auth: googleAuth });

        return fileIds.map(async (fileId) => {
            return drive.files
                .get({ fileId, fields: 'iconLink,thumbnailLink,name,webViewLink,mimeType' })
                .then((req) => {
                    const fileData = req.data;

                    const file: File = {
                        id: fileId,
                        name: fileData.name || '[ERROR] missing name',
                        icon: fileData.iconLink ?? null,
                        thumbnail: fileData.thumbnailLink ?? null,
                        webViewLink: fileData.webViewLink ?? null,
                        mimeType: fileData.mimeType ?? null,
                    };
                    return file;
                });
        });
    });
}

export async function getFileModifiedDate(fileId: string): Promise<string> {
    const session = await auth();

    const googleAuth = new google.auth.OAuth2({
        clientId: process.env.AUTH_GOOGLE_ID,
        clientSecret: process.env.AUTH_GOOGLE_SECRET,
    });

    googleAuth.setCredentials({
        access_token: session?.user.access_token,
        refresh_token: session?.user.refresh_token,
    });

    const drive = google.drive({ version: 'v3', auth: googleAuth });

    const file = await drive.files.get({ fileId, fields: 'modifiedTime' }, {});

    return file?.data?.modifiedTime || '';
}
