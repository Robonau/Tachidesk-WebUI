/*
 * Copyright (C) Contributors to the Suwayomi project
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

// adopted from: https://github.com/tachiyomiorg/tachiyomi/blob/master/app/src/main/java/eu/kanade/tachiyomi/widget/EmptyView.kt

import { useMemo } from 'react';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const ERROR_FACES = ['(･o･;)', 'Σ(ಠ_ಠ)', 'ಥ_ಥ', '(˘･_･˘)', '(；￣Д￣)', '(･Д･。'];

function getRandomErrorFace() {
    const randIndex = Math.floor(Math.random() * ERROR_FACES.length);
    return ERROR_FACES[randIndex];
}

interface IProps {
    message: string;
    messageExtra?: JSX.Element | string;
    retry?: () => void;
    noFaces?: boolean;
}

export function EmptyView({ message, messageExtra, retry, noFaces }: IProps) {
    const { t } = useTranslation();
    const theme = useTheme();
    const isMobileWidth = useMediaQuery(theme.breakpoints.down('sm'));

    const errorFace = useMemo(() => getRandomErrorFace(), []);

    return (
        <Stack
            sx={{
                position: 'absolute',
                left: `calc(50% + ${isMobileWidth ? '0px' : theme.spacing(8 / 2)})`,
                top: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                alignItems: 'center',
            }}
        >
            {!noFaces && (
                <Typography variant="h3" gutterBottom>
                    {errorFace}
                </Typography>
            )}
            {retry && <Button onClick={retry}>{t('global.button.retry')}</Button>}
            <Typography variant="h5">{message}</Typography>
            {messageExtra}
        </Stack>
    );
}

EmptyView.defaultProps = {
    messageExtra: undefined,
};
