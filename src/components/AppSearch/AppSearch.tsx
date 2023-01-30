// Core
import React, { forwardRef, useState } from 'react'
import { useDebouncedValue } from '@mantine/hooks'
import { Group, Text, Autocomplete, Loader, createStyles } from '@mantine/core'

// Api
import { useSearchByNameQuery } from '../../store/weather/weather.api'

// Interface
import { ISearch } from '../../interface/ISearch'
interface IGetWeatherProps {
    getWeather: (name: string, b: boolean) => void
}

// Custom Styles
const useStyles = createStyles((theme) => ({
    AutoCompleteItem: {
        cursor: 'pointer',
        width: '100%',
        padding: '10px 5px',
        borderRadius: '4px',
        ':hover': {
            backgroundColor: theme.colors.blue[6]
        }
    }
}))


export const AppSearch = ({getWeather}: IGetWeatherProps) => {

    const [value, setValue] = useState('')
    const [debounced] = useDebouncedValue(value, 400)

    const { classes } = useStyles()

    const { data: cityList = null, isLoading, isFetching, isError } = useSearchByNameQuery(debounced, {
        skip: debounced.length < 2
    })

    const data = cityList !== null ? cityList.map((item) => ({ ...item, value: item.name })) : []

    const AutoCompleteItem = forwardRef<HTMLDivElement, ISearch>(
        ({ name, country, region, ...others }: ISearch, ref) => (
            <div
                ref={ref}
                className={classes.AutoCompleteItem}
                {...others}
            >
                <Group noWrap>
                    <div>
                        <Text>{name}, {region}, {country}</Text>
                    </div>
                </Group>
            </div>
        )
    )


    return (
        <Autocomplete
            value={value}
            onChange={setValue}
            placeholder="Enter location name"
            itemComponent={AutoCompleteItem}
            onItemSubmit={({name}) => {
                console.log(name)
                getWeather(name, true)
                setValue('')
            }}
            data={data}
            rightSection={isLoading || isFetching ? <Loader/> : null}
            error={isError ? <p>Something went wrong...</p> : null}
            nothingFound={'Nothing Found'}
        />
    )
}