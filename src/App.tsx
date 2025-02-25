import * as React from "react";
import {Layout} from "./components/Layout";
import {Route, Routes} from "react-router-dom"
import {CategoryList} from "./features/categories/ListCategory";
import {CategoryCreate} from "./features/categories/CreateCategory";
import {CategoryEdit} from "./features/categories/EditCategory";
import {Box, Typography} from "@mui/material";
import {ListCastmembers} from "./features/cast/ListCastmembers";
import {CreateCastMember} from "./features/cast/CreateCastMember";
import {EditCastMember} from "./features/cast/EditCastMember";
import {GenreCreate} from "./features/genre/GenreCreate";
import {GenreEdit} from "./features/genre/GenreEdit";
import {GenreList} from "./features/genre/GenreList";
import {VideosList} from "./features/videos/VideosList";
import {VideosCreate} from "./features/videos/VideosCreate";
import {VideosEdit} from "./features/videos/VideosEdit";
import {UploadList} from "./features/uploads/UploadList";

function App() {
    return (

        <Layout>
            <UploadList/>
            <Routes>
                {/*Category*/}
                <Route path="/" element={<CategoryList/>}/>
                <Route path="/categories" element={<CategoryList/>}/>
                <Route path="/categories/create" element={<CategoryCreate/>}/>
                <Route path="/categories/edit/:id" element={<CategoryEdit/>}/>

                {/*Cast Members*/}
                <Route path="/cast-members" element={<ListCastmembers/>}/>
                <Route path="/cast-members/create" element={<CreateCastMember/>}/>
                <Route path="/cast-members/edit/:id" element={<EditCastMember/>}/>

                {/*Genre*/}
                <Route path="genres" element={<GenreList/>}/>
                <Route path="genres/create" element={<GenreCreate/>}/>
                <Route path="genres/edit/:id" element={<GenreEdit/>}/>

                {/* Videos */}
                <Route path="/videos" element={<VideosList/>}/>
                <Route path="/videos/create" element={<VideosCreate/>}/>
                <Route path="/videos/edit/:id" element={<VideosEdit/>}/>

                <Route path="*" element={
                    <Box sx={{color: "white"}}>
                        <Typography variant="h1">404</Typography>
                        <Typography variant="h2">Page not found</Typography>
                    </Box>
                }/>
            </Routes>
        </Layout>
    )
}

export default App;
