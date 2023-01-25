// Core
import { forwardRef, useState } from 'react';
import { useDebouncedValue } from '@mantine/hooks';
import { Group, Text, Autocomplete, Loader, createStyles } from '@mantine/core';

// Api
import {IGetWeather, useSearchByNameQuery} from '../../store/weather/weather.api'

// Interface
import { ISearch } from '../../interface/ISearch';
interface IGetWeatherProps {
    getWeather: ({name, day}:IGetWeather) => void
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

    // Debounced Value from Autocomplete
    const [value, setValue] = useState('')
    const [debounced] = useDebouncedValue(value, 400)

    // Using Custom Styles
    const { classes } = useStyles();

    // RTK Query Hook From API
    const { data: cityList = null, isLoading, isFetching, isError } = useSearchByNameQuery(debounced, {
        skip: debounced.length < 2
    })

    //
    const data = cityList !== null ? cityList.map((item) => ({ ...item, value: item.name })) : [];

    const AutoCompleteItem = forwardRef<HTMLDivElement, ISearch>(
        ({ name, country, region }: ISearch, ref) => (
            <div
                ref={ref}
                className={classes.AutoCompleteItem}
                onClick={() => {onSubmitName(name)}}
            >
                <Group noWrap>
                    <div>
                        <Text>{name}, {region}, {country}</Text>
                    </div>
                </Group>
            </div>
        )
    );


    const onSubmitName = (name: string) => {

        getWeather({name: name})
        setValue('')
    }

    return (
        <Autocomplete
            value={value}
            onChange={setValue}
            placeholder="Enter location name"
            itemComponent={AutoCompleteItem}
            data={data}
            rightSection={isLoading || isFetching ? <Loader/> : null}
            error={isError ? <p>Something went wrong...</p> : null}
            nothingFound={'Nothing Found'}
        />
    );
}