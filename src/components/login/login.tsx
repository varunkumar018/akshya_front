import React, { useState } from 'react';
import {
  Grid,
  Tabs,
  TextInput,
  PasswordInput,
  Anchor,
  Checkbox,
  Button,
  Group,
  Avatar,
  Divider,
  Fieldset,
  Text,
  GridCol,
  Image,
} from '@mantine/core';
import {
  IconBrandGoogleFilled,
  IconBrandWindows,
  IconBrandFacebookFilled,
} from '@tabler/icons-react';
import classes from './login.module.css';
import { Link } from 'react-router-dom';
import { b } from 'vitest/dist/suite-IbNSsUWN';

const UserTab = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = () => {
    if (username === '' && password === '') {
      // Redirect to the user dashboard
      window.location.href = '/homepage';
    } else {
      // Show alert message for invalid credentials
      alert('Invalid username or password');
    }
  };

  return (
    <Fieldset variant="unstyled">
      <Text size="lg" ta={'center'} >
        Welcome Back Student
      </Text>
      <TextInput
        placeholder="username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <PasswordInput
        placeholder="Password"
        mt={'md'}
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <Anchor href="#" underline="hover">
        <Text ta={'right'}>forgot password?</Text>
      </Anchor>
      <Checkbox defaultChecked label="Remember me" size="xs" />
      <Button fullWidth mt={'md'} color="black" onClick={handleLogin}>
        Login
      </Button>
      
    </Fieldset>
  );
};

export default UserTab;

const AdminTab = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === '' && password === '') {
      // Redirect to the dashboard
      window.location.href = '/homepage';
    } else {
      // Show alert message for invalid credentials
      alert('Invalid username or password');
    }
  };

  return (
    <Fieldset variant="unstyled">
      <Text size="lg" ta={'center'}>
        Welcome Back Admin
      </Text>
      <TextInput
        placeholder="username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <PasswordInput
        placeholder="Password"
        mt={'md'}
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <Anchor href="#" underline="hover">
        <Text ta={'right'}>forgot password?</Text>
      </Anchor>
      <Checkbox defaultChecked label="Remember me" size="xs" />
      <Button fullWidth mt={'md'} color="black" onClick={handleLogin}>
        Login
      </Button>
      
    </Fieldset>
  );
};

// UserTab component remains unchanged

export function Login() {
  return (
    <Grid className={classes.grid}>
      <Grid.Col span={6} visibleFrom="md">
        <Image
          radius="md"
          height="100%"
          src="https://rymec.edu.in/wp-content/uploads/2023/03/baim5.png"
        />
      </Grid.Col>

      <Grid.Col span={6} className={classes.col}>
        <Tabs variant="outline" radius="lg" defaultValue="gallery" className={classes.tabs}>
          <Tabs.List className={classes.tabslist}>
            <Tabs.Tab value="gallery" className={classes.tab}>
              Admin
            </Tabs.Tab>
            <Tabs.Tab value="messages" className={classes.tab}>
              Student
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="gallery" className={classes.panel}>
            <AdminTab />
          </Tabs.Panel>

          <Tabs.Panel value="messages" className={classes.panel}>
            <UserTab />
          </Tabs.Panel>
        </Tabs>
      </Grid.Col>
    </Grid>
  );
}