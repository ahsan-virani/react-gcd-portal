import { Link } from 'react-router';
import styled from 'styled-components';

export default styled(Link)
`
    color: #878787;
    padding-bottom: 25px;
    display: block;
    text-decoration:none;

  &.active {
    color: #fff;
    border-bottom: 2px solid #158dd3;
  }

  &:hover {
    color: #fff;
    border-bottom: 2px solid #158dd3;
    text-decoration:none;
  }
`;
