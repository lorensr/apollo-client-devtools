/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useTheme } from "emotion-theming";
import { rem } from "polished";
import { List } from "@apollo/space-kit/List";
import { ListItem } from "@apollo/space-kit/ListItem";
import { IconRun } from "@apollo/space-kit/icons/IconRun";
import { colors } from "@apollo/space-kit/colors";
import { SidebarLayout } from "../Layouts/SidebarLayout";
import { OperationViewer } from "./OperationViewer";

const sidebarHeadingStyles = css`
  margin-left: ${rem(12)};
  text-transform: uppercase;
  font-size: ${rem(13)};
  font-weight: normal;
  letter-spacing: ${rem(1)};
  color: rgba(255, 255, 255, .3);
`;

const h1Styles = css`
  font-family: monospace;
  font-weight: normal;
`;

const operationNameStyles = css`
  margin: ${rem(3)} 0 0 ${rem(8)};
  font-family: "Source Sans Pro", sans-serif;
  color: ${colors.grey.light};
  text-transform: uppercase;
  font-size: ${rem(13)};
`;

const runButtonStyles = css`
  appearance: none;
  display: flex;
  align-items: center;
  margin: 0 0 0 auto;
  border: none;
  font-size: ${rem(15)};
  background-color: transparent;
  cursor: pointer;

  > svg {
    width: ${rem(16)};
    margin-right: ${rem(8)};
  }
`;

const listStyles = css`
  font-family: monospace;
  color: ${colors.silver.lighter};

  > div {
    height: ${rem(36)};
    font-size: ${rem(15)};
  }
`;

const OperationLayout = ({ 
  navigationProps, 
  operationName, 
  operations, 
  queryString, 
  variables, 
  cachedData, 
  selectedQuery,
  onQuerySelected,
}) => {
  const theme = useTheme<any>();

  return (
    <SidebarLayout 
      navigationProps={navigationProps}
    >
      <SidebarLayout.Header>
        <h1 css={h1Styles}>{operationName}</h1>
        <span css={operationNameStyles}>Query</span>
        <button css={runButtonStyles}>
          <IconRun />
          <span>Run in GraphiQL</span>
        </button>
      </SidebarLayout.Header>
      <SidebarLayout.Sidebar>
        <h3 css={sidebarHeadingStyles}>Active Queries ({navigationProps.queriesCount})</h3>
        <List
          css={listStyles}
          selectedColor={theme.sidebarSelected}
          hoverColor={theme.sidebarHover}
        >
          {operations.map(({ name, id }) => {
            return (
              <ListItem 
                key={`${name}-${id}`}
                onClick={() => onQuerySelected(id)}
                selected={selectedQuery === id}
              >
                {name}
              </ListItem>
            );
          })}
        </List>
      </SidebarLayout.Sidebar>
      <SidebarLayout.Main>
          <OperationViewer
            queryString={queryString}
            variables={variables}
            cachedData={cachedData}
          />
      </SidebarLayout.Main>
    </SidebarLayout>
  );
};

export { OperationLayout };