export interface Sponsor {
    id: string;
    name: string;
    logo: string;
    website: string;
    tier: 'platinum' | 'gold' | 'silver' | 'bronze';
}

export const sponsors: Sponsor[] = [
    {
        id: 'ansys',
        name: 'Ansys',
        logo: '/images/sponsors/ansys.jpg',
        website: 'https://www.ansys.com',
        tier: 'platinum',
    },
    {
        id: 'solidworks',
        name: 'Solid Works',
        logo: '/images/sponsors/solidworks.png',
        website: 'https://www.solidworks.com',
        tier: 'platinum',
    },
    {
        id: 'altium',
        name: 'Altium Designer',
        logo: '/images/sponsors/altium.png',
        website: 'https://www.altium.com',
        tier: 'gold',
    },
    {
        id: 'altair',
        name: 'Altair',
        logo: '/images/sponsors/altair.png',
        website: 'https://www.altair.com',
        tier: 'gold',
    },
];
