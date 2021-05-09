import { Stack, Text } from "@chakra-ui/react"
import { Config } from "../../interfaces/Config.interface";
import { PaginationItem } from './PaginationItem';

interface PaginationProps {
    totalCountOfRegister: number;
    registerPerPage?: number;
    currentPage?: number;
    who: string;

}

const siblingsCount = 1;

function generatePagesArray(from: number, to: number) {
    return [...new Array(to - from)].map((_, index) => {
        return from + index + 1;
    }).filter(page => page > 0)
}

export function Pagination({ totalCountOfRegister, registerPerPage = 3, currentPage = 1, who }: PaginationProps) {
    const lastPage = Math.floor(totalCountOfRegister / registerPerPage);

    const previousPage = currentPage > 1 ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1) : [];

    const nextPages = currentPage < lastPage ? generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage)) : [];



    return (
        <>
            <Stack
                direction="row"
                mt="8"
                justify="space-between"
                align="center"

            >

                {currentPage > (1 + siblingsCount) && (
                    <>
                        <PaginationItem who={who} number={1} />
                        {currentPage > (2 + siblingsCount && <Text>...</Text>)}
                    </>
                )}
                {previousPage.length > 0 && previousPage.map(page => {
                    return <PaginationItem who={who} key={page} number={page} />
                })}

                <PaginationItem who={who} number={currentPage} isCurrent />

                {nextPages.length > 0 && nextPages.map(page => {
                    return <PaginationItem who={who} key={page} number={page} />
                })}

                {(currentPage + siblingsCount) < lastPage && (
                    <>
                        <PaginationItem who={who} number={lastPage} />
                        {(currentPage + 1 + siblingsCount) < lastPage && <Text>...</Text>}
                    </>
                )}

            </Stack>

        </>
    )
}