import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Notifications from '~/components/Notifications';

import logo from '~/assets/fastfeet-logo.png';

import { Container, Content, Profile } from './styles';

export default function Header() {
  const profile = useSelector(state => state.user.profile);

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} size={10} alt="FastFeet" />
          {/* <Link to="/dashboard">DASHBOARD</Link> */}
          <Link to="/delivery/list">ENCOMENDAS</Link>
          <Link to="/deliveryman/list">ENTREGADORES</Link>
          <Link to="/recipient/list">DESTINATÁRIOS</Link>
          <Link to="/deliveryProblem/list">PROBLEMAS</Link>
        </nav>

        <aside>
          <Notifications />
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <Link to="/profile">Meu perfil</Link>
            </div>
            <img
              src={
                profile.avatar.url ||
                'https://api.adorable.io/avatars/50/abott@adorable.png'
              }
              alt="Leonardo"
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
