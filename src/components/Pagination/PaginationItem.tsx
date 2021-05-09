import { Button } from "@chakra-ui/react"
import { useAuth } from '../../hooks/useAuth';

interface PaginationItemProps {
    number: number;
    isCurrent?: boolean;
    who: string;
}

export function PaginationItem({ isCurrent = false, number, who }: PaginationItemProps) {

    const { setConfigs, configs } = useAuth();
    if (isCurrent) {
        return (
            <Button
                size="sm"
                fontSize="xs"
                width="4"
                color="gray.700"
                bg="green.400"
                disabled
                _disabled={{
                    bgColor: "gray:500",
                    cursor: "default"
                }}
            >
                {number}
            </Button>
        )
    }

    return (
        <Button
            size="sm"
            fontSize="xs"
            width="4"
            bg="gray.400"
            _disabled={{
                bgColor: "gray:500",
            }}
            onClick={() => setConfigs({
                favoritesCurrentPage: who === "favorites" ? number : configs?.favoritesCurrentPage,
                productCurrentPage: who === "products" ? number : configs?.productCurrentPage
            })}
        >
            {number}
        </Button>
    )
}