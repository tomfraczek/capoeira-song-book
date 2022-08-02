import { CategoryBadgeContainer } from './CategoryBadge.styles';

// const CategoryBadge = ({ category }) => <CategoryBadgeContainer>{category}</CategoryBadgeContainer>;

const CategoryBadge = ({ tags }) => {
    
    return (
    <>
  {tags && tags.map((tag, i) => {
    return <CategoryBadgeContainer key={i}>{tag}</CategoryBadgeContainer>
  })}
    
    </>
    )
}


export default CategoryBadge;
