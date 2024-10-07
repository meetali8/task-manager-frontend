import { PageTitleProps } from '@/constants/commonInterfaces';
import Head from 'next/head';
import React from 'react';


export const PageTitle = (props: PageTitleProps) => {
    return (
        <Head>
            <title>{props.title}</title>
        </Head>
    );
};

PageTitle.displayName = 'PageTitle';