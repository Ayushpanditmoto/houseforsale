import React from "react";
import styled from "styled-components";

function Input({ ...props }) {
  return (
    <Formgroup>
      {props.leading && <div className="leading">{props.leading}</div>}

      <input
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        disabled={props.disabled}
      />
      {props.icons && (
        <div
          className="icon"
          onClick={() => {
            props.onClick();
          }}
        >
          {props.icons}
        </div>
      )}
    </Formgroup>
  );
}

export default Input;

const Formgroup = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin: 1rem 0;
  background: #ffffff;
  border-radius: 10px;
  input {
    margin-left: ${(props) => (!props.leading ? "3rem" : "0")};
    padding: 1rem;
    width: 100%;
    border: none;
    outline: none;
    background: transparent;
    font-size: 1rem;
  }
  .leading {
    position: absolute;
    transform: translateX(10px);
    left: 0.5rem;
    width: 20px;
    height: 20px;
  }
  .icon {
    position: absolute;
    right: 0.5rem;
    width: 30px;
    height: 30px;
  }
  svg {
    width: 100%;
    height: 100%;
  }
`;
