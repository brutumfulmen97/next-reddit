"use client";

import { FC, useCallback, useState } from "react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "./ui/Command";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Subreddit, Prisma } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Users } from "lucide-react";
import debounce from "lodash.debounce";
interface SearchBarProps {}

const SearchBar: FC<SearchBarProps> = ({}) => {
    const [input, setInput] = useState<string>("");
    const router = useRouter();

    const {
        data: queryResult,
        refetch,
        isFetched,
        isFetching,
    } = useQuery({
        queryFn: async () => {
            if (!input) return [];
            const { data } = await axios.get(`/api/search?q=${input}`);
            return data as (Subreddit & {
                _count: Prisma.SubredditCountOutputType;
            })[];
        },
        queryKey: ["search-query"],
        enabled: false,
    });

    const request = debounce(() => refetch(), 300);

    const debounceRequest = useCallback(() => {
        request();
    }, [request]);

    return (
        <Command className="relative rounded-lg border max-w-lg z-50 overflow-visible">
            <CommandInput
                value={input}
                onValueChange={(text) => {
                    setInput(text);
                    debounceRequest();
                }}
                className="outline-none border-none focus:border-none focus:outline-none ring-0"
                placeholder="Search communities..."
                isLoading={isFetching}
            />
            {input.length > 0 && (
                <CommandList className="absolute top-full inset-x-0 w-full bg-white rounded-b-lg shadow">
                    {isFetched && (
                        <CommandEmpty>No results found.</CommandEmpty>
                    )}
                    {(queryResult?.length ?? 0) > 0 ? (
                        <CommandGroup heading="Communities">
                            {queryResult?.map((subreddit) => (
                                <CommandItem
                                    onSelect={(e) => {
                                        router.push(`/r/${e}`);
                                        router.refresh();
                                    }}
                                    key={subreddit.id}
                                    value={"r/" + subreddit.name}
                                >
                                    <Users className="mr-2 h-4 w-4" />
                                    <a href={`/r/${subreddit.name}`}>
                                        r/{subreddit.name}
                                    </a>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    ) : null}
                </CommandList>
            )}
        </Command>
    );
};

export default SearchBar;
