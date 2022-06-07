import {
  Box,
  Button,
  Flex,
  FlexProps,
  FormLabel,
  Input,
  List,
  ListIcon,
  ListItem,
  Select,
  Text,
} from '@chakra-ui/react'
import React, { ChangeEvent, FormEvent, FunctionComponent, useState } from 'react'
import { BsSortDown, BsSortUpAlt } from 'react-icons/bs'

export type Field = {
  name: string
  key: string
  sortAs: 'string' | 'number'
}

export type HeaderOptionsProps = {
  sortKey: string
  sortDirAsc: boolean
  sortAs: 'string' | 'number'
  filterKey: string
  filterValue: string
}

type OwnProps = {
  initialSortDirAsc?: boolean
  initialField: Field
  sortable: Field[]
  handleData: (params: HeaderOptionsProps) => void
}

type Props = OwnProps & FlexProps

const HeaderOptions: FunctionComponent<Props> = ({
  initialSortDirAsc = true,
  initialField,
  sortable,
  handleData,
  ...flexProps
}) => {
  /* Filtering */
  const [filter, setFilter] = useState({ filterKey: '', filterValue: '' })
  const handleFilterKey = (event: ChangeEvent<HTMLSelectElement>) => {
    setFilter((prev) => ({ ...prev, filterKey: event.target.value }))
  }

  const FilterValueOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter((prev) => ({ ...prev, filterValue: event.target.value }))
  }

  const submitFilter = (e: FormEvent) => {
    e.preventDefault()
    const params = { ...sort, ...filter }
    handleData(params)
  }

  const clearFilter = () => {
    const filters = { filterKey: '', filterValue: '' }
    handleData({ ...sort, ...filters })
    setFilter(filters)
  }

  const filterOptions: JSX.Element[] = sortable.map((s: Field, i: number) => (
    <option key={`${s.key}${i}`} value={s.key} selected={s.key === filter.filterKey}>
      {s.name}
    </option>
  ))

  /* Sorting */
  const [sort, setSort] = useState({
    sortDirAsc: initialSortDirAsc,
    sortKey: initialField.key,
    sortAs: initialField.sortAs,
    name: initialField.name,
  })

  const handleSorting = (selectedField: Field) => {
    const { name: _, ...params } = { ...sort, ...filter }

    if (sort.sortKey === selectedField.key) {
      params.sortDirAsc = !sort.sortDirAsc
      handleData(params)
      setSort((prev) => ({ ...prev, sortDirAsc: !prev.sortDirAsc }))
    } else {
      const updatedSort = {
        sortDirAsc: true,
        sortKey: selectedField.key,
        sortAs: selectedField.sortAs,
      }
      Object.assign(params, updatedSort)
      handleData({ ...params, ...updatedSort })
      setSort({ ...updatedSort, name: selectedField.name })
    }
  }

  const SortingOptions = (): JSX.Element => {
    const listItems = sortable.map((field: Field, i: number) => {
      const onClickSorting = () => handleSorting(field)
      const isCurrentSortKey = sort.sortKey === field.key
      return (
        <ListItem
          key={`${field.key}${i}`}
          display="flex"
          flexDir="row"
          alignItems="center"
          borderColor={isCurrentSortKey ? '#007bff' : 'blackAlpha.200'}
          borderRadius="4px"
          borderWidth="1px"
          bg="blackAlpha.200"
          p="4px"
          onClick={onClickSorting}
          mr="6px"
          _hover={{ cursor: 'pointer' }}
        >
          <Text fontSize="sm">{field.name}</Text>
          <ListIcon
            as={!sort.sortDirAsc && isCurrentSortKey ? BsSortUpAlt : BsSortDown}
            color={isCurrentSortKey ? '#007bff' : 'blackAlpha.800'}
            w="24px"
            h="24px"
            pl="4px"
          />
        </ListItem>
      )
    })

    return (
      <List display="flex" flexDir="row" stylePosition="inside" styleType="none">
        {listItems}
      </List>
    )
  }

  return (
    <Flex flexDir="column" w="100%" px="20px" pb="20px">
      <Flex wrap="wrap" py="20px" {...flexProps}>
        <Box mr="6px">
          <Text>Filter by:</Text>
          <Select placeholder="Select option" w="200px" onChange={handleFilterKey}>
            {filterOptions}
          </Select>
        </Box>

        {filter.filterKey && (
          <form onSubmit={submitFilter}>
            <FormLabel m={0}>Filter text:</FormLabel>
            <Flex flexDir="row" wrap="wrap">
              <Input value={filter.filterValue} onChange={FilterValueOnChange} w="200px" mr="6px" />
              <Box>
                <Button type="submit" mr="6px">
                  Search
                </Button>
                <Button onClick={clearFilter}>Clear</Button>
              </Box>
            </Flex>
          </form>
        )}
      </Flex>
      <Box>
        <Text>Sort:</Text>
        <SortingOptions />
      </Box>
    </Flex>
  )
}
export default HeaderOptions
