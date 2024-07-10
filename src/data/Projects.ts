export interface Project {
    id : number,
    name : string,
    xp : number,
    category_id? : number
}

export const Projects : Project[] = [
    {
        id : 0,
        name : 'Libft',
        xp : 462
    },
    {
        id : 1,
        name : 'ft_printf',
        xp : 882
    },
    {
        id : 2,
        name : 'get_next_line',
        xp : 882
    },
    {
        id : 3,
        name : 'Born2beroot',
        xp : 577
    },
    {
        id : 4,
        name : 'so_long',
        xp : 1000,
        category_id : 1
    },
    {
        id : 5,
        name : 'FdF',
        xp : 1000,
        category_id : 1
    },
    {
        id : 6,
        name : 'fract-ol',
        xp : 1000,
        category_id : 1
    },
    {
        id : 7,
        name : 'pipex',
        xp : 1142,
        category_id : 2
    },
    {
        id : 8,
        name : 'minitalk',
        xp : 1142,
        category_id : 2
    },
    {
        id : 8,
        name : 'push_swap',
        xp : 1855
    },
    {
        id : 9,
        name : 'Philosophers',
        xp : 3360
    },
    {
        id : 10,
        name : 'minishell',
        xp : 2814
    },
    {
        id : 11,
        name : 'NetPractice',
        xp : 3160
    },
    {
        id : 12,
        name : 'cub3d',
        xp : 5775,
        category_id : 3
    },
    {
        id : 13,
        name : 'miniRT',
        xp : 5775,
        category_id : 3
    },
    {
        id : 14,
        name : 'cpp',
        xp : 10042
    },
    {
        id : 15,
        name : 'webserv',
        xp : 21630,
        category_id : 4
    },
    {
        id : 16,
        name : 'ft_irc',
        xp : 21630,
        category_id : 4
    },
    {
        id : 17,
        name : 'Inception',
        xp : 10042
    },
    {
        id : 18,
        name : 'ft_transcendence',
        xp : 24360
    }
]