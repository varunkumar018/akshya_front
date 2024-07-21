import { Title, Avatar, Group, Text } from '@mantine/core';
import React from 'react';
import classes from './header.module.css';
import { IconUser } from '@tabler/icons-react';

export function Header() {
  return (
    <div className={classes.header}>
      <Title order={4} size={32} ml={20}>AKSHYA</Title>
      <div className={classes.profile}>
        <Group >
          <Avatar color="blue" radius="xl">
            <IconUser size={24} />
          </Avatar>
          <Text>Username</Text>
        </Group>
      </div>
    </div>
  );
}
