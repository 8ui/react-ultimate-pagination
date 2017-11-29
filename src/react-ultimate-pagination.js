import React from 'react';
import PropTypes from 'prop-types'
import {getPaginationModel, ITEM_TYPES} from 'ultimate-pagination';

const renderItemComponentFunctionFactory = (itemTypeToComponent, currentPage, onChange, itemProps) => {
  const onItemClickFunctionFactory = (value) => {
    return () => {
      if (onChange && currentPage !== value) {
        onChange(value);
      }
    }
  };

  return (item) => {
    const ItemComponent = itemTypeToComponent[item.type];
    const onItemClick = onItemClickFunctionFactory(item.value);
    return <ItemComponent onClick={onItemClick} {...item} {...itemProps}/>;
  }
};

export const createUltimatePagination = ({itemTypeToComponent, WrapperComponent = 'div'}) => {
  const UltimatePaginationComponent = (props) => {
    const {
      currentPage,
      totalPages,
      boundaryPagesRange,
      siblingPagesRange,
      hideEllipsis,
      hidePreviousAndNextPageLinks,
      hideFirstAndLastPageLinks,
      onChange,
      item
    } = props;

    const paginationModel = getPaginationModel({
      currentPage,
      totalPages,
      boundaryPagesRange,
      siblingPagesRange,
      hideEllipsis,
      hidePreviousAndNextPageLinks,
      hideFirstAndLastPageLinks
    });
    const renderItemComponent = renderItemComponentFunctionFactory(itemTypeToComponent, currentPage, onChange, item);
    return <WrapperComponent>{paginationModel.map(renderItemComponent)}</WrapperComponent>;
  };

  UltimatePaginationComponent.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    boundaryPagesRange: PropTypes.number,
    siblingPagesRange: PropTypes.number,
    hideEllipsis: PropTypes.bool,
    hidePreviousAndNextPageLinks: PropTypes.bool,
    hideFirstAndLastPageLinks: PropTypes.bool,
    onChange: PropTypes.func,
    item: PropTypes.object,
  };

  UltimatePaginationComponent.defaultProps = {
    item: {},
  };

  return UltimatePaginationComponent;
};

export {ITEM_TYPES};
