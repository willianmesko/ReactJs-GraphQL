import React, { FC, ChangeEvent, useEffect, useState } from "react";
import {
  Grid,
  Center,
  Select,
  ButtonProps,
  Text,
  Button,
  ChakraProvider
} from "@chakra-ui/react";
import {
  Paginator,
  Container,
  Previous,
  usePaginator,
  Next,
  PageGroup
} from "chakra-paginator";



export default function Paginators() {
      // constants
  const outerLimit = 2;
  const innerLimit = 2;

    const {
        isDisabled,
        pagesQuantity,
        currentPage,
        setCurrentPage,
        setIsDisabled,
        pageSize,
        setPageSize,
        offset // you may not need this most of the times, but it's returned for you anyway
      } = usePaginator({
        total: 10,
        initialState: {
          pageSize: 3,
          currentPage: 1,
          isDisabled: false
        }
      });

      const baseStyles: ButtonProps = {
        w: 7,
        fontSize: "sm"
      };
    
      const normalStyles: ButtonProps = {
        ...baseStyles,
        _hover: {
          bg: "green.300"
        },
        bg: "red.300"
      };
    
      const activeStyles: ButtonProps = {
        ...baseStyles,
        _hover: {
          bg: "blue.300"
        },
        bg: "green.300"
      };
    
      const separatorStyles: ButtonProps = {
        w: 7,
        bg: "green.200"
      };

      // handlers
  const handlePageChange = (nextPage: number) => {
    // -> request new data using the page number
    setCurrentPage(nextPage);
    console.log("request new data with ->", nextPage);
  };

  const handlePageSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const pageSize = Number(event.target.value);

    setPageSize(pageSize);
  };

  const handleDisableClick = () => {
    return setIsDisabled((oldState) => !oldState);
  };

    return (
        <Paginator
        isDisabled={isDisabled}
        activeStyles={activeStyles}
        innerLimit={innerLimit}
        currentPage={currentPage}
        outerLimit={outerLimit}
        normalStyles={normalStyles}
        separatorStyles={separatorStyles}
        pagesQuantity={pagesQuantity}
        onPageChange={handlePageChange}
      >
        <Container align="center" justify="space-between" w="full" p={4}>
          <Previous>
            Previous
            {/* Or an icon from `react-icons` */}
          </Previous>
          <PageGroup isInline align="center" />
          <Next>
            Next
            {/* Or an icon from `react-icons` */}
          </Next>
        </Container>
      </Paginator>
    )
}