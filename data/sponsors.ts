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
        logo: '/images/sponsors/ansys.svg',
        website: 'https://www.ansys.com',
        tier: 'platinum',
    },
    {
        id: 'solidworks',
        name: 'Solid Works',
        logo: '/images/sponsors/solidworks.svg',
        website: 'https://www.solidworks.com',
        tier: 'platinum',
    },
    {
        id: 'altium',
        name: 'Altium Designer',
        logo: '/images/sponsors/altium.svg',
        website: 'https://www.altium.com',
        tier: 'gold',
    },
    {
        id: 'bender',
        name: 'Bender',
        logo: '/images/sponsors/bender.svg',
        website: 'https://www.bender.de',
        tier: 'gold',
    },
];
