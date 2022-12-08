import { TextInput, TextInputProps, ActionIcon, useMantineTheme } from '@mantine/core';
import { IconSearch, IconArrowRight } from '@tabler/icons';

const AppSearch = (props: TextInputProps) => {
    const theme = useMantineTheme();

    return (
        <TextInput
            icon={<IconSearch size={18} stroke={1.5} />}
            radius="xl"
            size="md"
            rightSection={
                <ActionIcon size={32} radius="xl" color={theme.primaryColor} variant="filled">
                    <IconArrowRight size={18} stroke={1.5} />
                </ActionIcon>
            }
            placeholder="Search questions"
            rightSectionWidth={42}
            {...props}
        />
    );
}

export default AppSearch;