interface Menu {
    label: string;
    pathname?: string;
    submenu?: Menu[];
}

const Menu: Array<Menu> = [
    {
        label: 'Home',
        pathname: '/'
    },
    {
        label: 'Tentang',
        pathname: '/about'
    },
]

export default Menu;