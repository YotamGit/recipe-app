import RecipeEditor from "./RecipeEditor";
import { useNavigate } from "react-router-dom";

//mui
import IconButton from "@mui/material/IconButton";

//mui icons
import CloseFullscreenRoundedIcon from "@mui/icons-material/CloseFullscreenRounded";

const AddRecipe = ({
  onAddRecipe,
  signedIn,
  setSignedIn,
  recipe_categories,
  recipe_difficulties,
  recipe_durations,
}) => {
  const navigate = useNavigate();
  const recipeTemplate = {
    _id: "",
    title: "",
    category: "",
    sub_category: "",
    difficulty: "",
    prep_time: "",
    total_time: "",
    servings: "",
    description: "",
    ingredients: "",
    directions: "",
    rtl: false,
    source: "",
    imageName: "",
    image: "",
  };

  return (
    <>
      <div className="add-recipe-page-top-button-row">
        <IconButton
          onClick={() => navigate(-1)}
          style={{ color: "gray", margin: "1%" }}
        >
          <CloseFullscreenRoundedIcon style={{ fontSize: "3.5vh" }} />
        </IconButton>
      </div>
      <RecipeEditor
        recipe={recipeTemplate}
        signedIn={signedIn}
        setSignedIn={setSignedIn}
        onEditRecipe={onAddRecipe}
        recipe_categories={recipe_categories}
        recipe_difficulties={recipe_difficulties}
        recipe_durations={recipe_durations}
      ></RecipeEditor>
    </>
  );
};

export default AddRecipe;
