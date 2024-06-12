import { Text, Container, ActionIcon, Group, rem, Divider } from '@mantine/core';
import classes from './styles.module.css';
import { AppLogo } from '..'

const data = [
    // {
    //     title: 'About',
    //     links: [
    //         { label: 'Features', link: '#' },
    //         { label: 'Pricing', link: '#' },
    //         { label: 'Support', link: '#' },
    //         { label: 'Forums', link: '#' },
    //     ],
    // },
    // {
    //     title: 'Project',
    //     links: [
    //         { label: 'Contribute', link: '#' },
    //         { label: 'Media assets', link: '#' },
    //         { label: 'Changelog', link: '#' },
    //         { label: 'Releases', link: '#' },
    //     ],
    // },
    {
        title: 'Мы в Соцсетях',
        links: [
            { label: 'Instagram', link: 'https://instagram.com/duwanbemarket' },
            { label: 'Facebook', link: '#' },
        ],
    },
];

export default function AppFooter() {
    const groups = data.map((group) => {
        const links = group.links.map((link, index) => (
            <Text<'a'>
                key={index}
                className={classes.link}
                component="a"
                href={link.link}
            >
                {link.label}
            </Text>
        ));

        return (
            <div className={classes.wrapper} key={group.title}>
                <Text className={classes.title}>{group.title}</Text>
                {links}
            </div>
        );
    });

    return (
        <footer className={classes.footer}>
            <Container className={classes.inner}>
                <div className={classes.logo}>
                    <AppLogo />
                    <Text size="xs" c="white" className={classes.description}>
                        Душанбе маркет, покупки станут проще
                    </Text>
                </div>
                <div className={classes.groups}>{groups}</div>
            </Container>
            <Container className={classes.afterFooter}>
                <Text c="white" size="sm">
                    2024 Dushanbe Market
                </Text>

                {/* <Group gap={0} className={classes.social} justify="flex-end" wrap="nowrap">
                    <ActionIcon size="lg" color="white" variant="subtle">
                        I
                    </ActionIcon>
                    <ActionIcon size="lg" color="white" variant="subtle">
                        Y
                    </ActionIcon>
                    <ActionIcon size="lg" color="white" variant="subtle">
                        T
                    </ActionIcon>
                </Group> */}
            </Container>
            <Divider />
            <div className='w-full flex p-3 items-center justify-center'>
                <a href='https://instagram.com/tajcent' className='text-[white] no-underline font-medium cursor-pointer'>
                    Tajcent Entertainment LLC {new Date().getFullYear()}
                </a>
            </div>
        </footer>
    );
}