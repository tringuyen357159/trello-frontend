export const initialData = {
    boards: [
        {
            id: 'board-1',
            columnOrder: ['column-1', 'column-2', 'column-3'],
            columns: [
                {
                    id: 'column-1',
                    boardId: 'board-1',
                    title: 'To do column 1',
                    cardOrder: ['card-1', 'card-2', 'card-3', 'card-4'],
                    cards: [
                        {
                            id: 'card-1',
                            boardId: 'board-1',
                            columnId: 'column-1',
                            title: 'To do card 1',
                            cover: 'https://d1iv5z3ivlqga1.cloudfront.net/wp-content/uploads/2021/01/30155341/fix-bug-1.jpg'
                        },
                        {
                            id: 'card-2',
                            boardId: 'board-1',
                            columnId: 'column-1',
                            title: 'To do card 2',
                            cover: null
                        },
                        {
                            id: 'card-3',
                            boardId: 'board-1',
                            columnId: 'column-1',
                            title: 'To do card 3',
                            cover: null
                        },
                        {
                            id: 'card-4',
                            boardId: 'board-1',
                            columnId: 'column-1',
                            title: 'To do card 4',
                            cover: null
                        }
                    ]
                },
                {
                    id: 'column-2',
                    boardId: 'board-1',
                    title: 'To do column 2',
                    cardOrder: ['card-5', 'card-6', 'card-7', 'card-8'],
                    cards: [
                        {
                            id: 'card-5',
                            boardId: 'board-1',
                            columnId: 'column-2',
                            title: 'To do card 5',
                            cover: null
                        },
                        {
                            id: 'card-6',
                            boardId: 'board-1',
                            columnId: 'column-2',
                            title: 'To do card 6',
                            cover: null
                        },
                        {
                            id: 'card-7',
                            boardId: 'board-1',
                            columnId: 'column-2',
                            title: 'To do card 7',
                            cover: null
                        },
                        {
                            id: 'card-8',
                            boardId: 'board-1',
                            columnId: 'column-2',
                            title: 'To do card 8',
                            cover: null
                        }
                    ]
                },
                {
                    id: 'column-3',
                    boardId: 'board-1',
                    title: 'To do column 3',
                    cardOrder: ['card-9', 'card-10', 'card-11', 'card-12'],
                    cards: [
                        {
                            id: 'card-9',
                            boardId: 'board-1',
                            columnId: 'column-3',
                            title: 'To do card 9',
                            cover: null
                        },
                        {
                            id: 'card-10',
                            boardId: 'board-1',
                            columnId: 'column-3',
                            title: 'To do card 10',
                            cover: null
                        },
                        {
                            id: 'card-11',
                            boardId: 'board-1',
                            columnId: 'column-3',
                            title: 'To do card 11',
                            cover: null
                        },
                        {
                            id: 'card-12',
                            boardId: 'board-1',
                            columnId: 'column-3',
                            title: 'To do card 12',
                            cover: null
                        }
                    ]
                }
            ]
        }
    ]
}