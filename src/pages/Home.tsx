import React, { useState, useEffect } from "react";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Item from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import DiffViewerComponent from "../components/DiffViewerComponent";

import * as resumeService from "../services/resume";
import { Box } from "@mui/material";

function Home() {
  const { register, handleSubmit, setValue, getValues } = useForm();

  const [currentResume, setCurrentResume] = useState<string | undefined>();
  const [optimizedResume, setOptimizedResume] = useState<string | undefined>();
  const [responseLoaded, setResponseLoaded] = useState<boolean>(false);

  useEffect(() => {
    resumeService.getDefaultResume().then((data: any) => {
      setValue("currentResume", data.defaultResume);
    });
  }, [setValue]);

  const handleSaveDefaultResume = () => {
    resumeService.saveDefaultResume(getValues("currentResume"));
  };

  return (
    <>
      <h1>AI Resume Optimizer</h1>
      <Box sx={{ m: 10 }} />
      <form
        onSubmit={handleSubmit((data: any) => {
          console.log(data);
          setCurrentResume(data.currentResume);
          // Backend api call
          const optimizedResumeValue =
            resumeService.getOptimizedResume(data).optimizedResume;
          setOptimizedResume(optimizedResumeValue);
          setValue("optimizedResume", optimizedResumeValue);
          setResponseLoaded(true);
        })}
      >
        <Grid container>
          <Grid xs={0} md={1} item={true}></Grid>
          <Grid xs={12} md={4} item={true}>
            <Item>
              <TextField
                id="filled-multiline-static"
                label="Job Description"
                multiline
                rows={14}
                variant="filled"
                fullWidth
                {...register("jobDescription", { required: true })}
              />
            </Item>
          </Grid>
          <Grid xs={0} md={2} item={true}></Grid>
          <Grid xs={12} md={4} item={true}>
            <Item>
              <TextField
                id="filled-multiline-static"
                label="Current resume"
                multiline
                rows={14}
                variant="filled"
                fullWidth
                {...register("currentResume")}
              />
            </Item>
          </Grid>
          <Grid xs={0} md={1} item={true}></Grid>
        </Grid>
        <Box sx={{ m: 2 }} />
        <Grid container>
          <Grid xs={0} md={6} item={true}></Grid>
          <Grid xs={12} md={6} item={true}>
            <Button variant="outlined" onClick={handleSaveDefaultResume}>
              Save as default resume
            </Button>
          </Grid>
        </Grid>

        <div style={{ margin: "20px auto" }}>
          {!responseLoaded && (
            <Button variant="contained" color="success" type="submit">
              Optimize resume
            </Button>
          )}
          {responseLoaded && (
            <>
              <Grid container>
                <Grid xs={0} md={4} item={true}></Grid>
                <Grid xs={12} md={4} item={true}>
                  <TextField
                    id="filled-multiline-static"
                    label="Custom instructions for AI"
                    multiline
                    rows={3}
                    variant="filled"
                    fullWidth
                    {...register("customInstructions")}
                  />
                  <Box sx={{ m: 2 }} />
                  <Button variant="contained" type="submit">
                    Re-optimize resume
                  </Button>
                </Grid>
                <Grid xs={0} md={4} item={true}></Grid>
              </Grid>
            </>
          )}
        </div>

        {responseLoaded && (
          <>
            <Grid container>
              <Grid xs={0} md={1} item={true}></Grid>
              <Grid xs={12} md={10} item={true}>
                <TextField
                  id="filled-multiline-static"
                  label="Optimized resume"
                  multiline
                  rows={14}
                  variant="filled"
                  fullWidth
                  {...register("optimizedResume")}
                  onChange={(e) => {
                    setOptimizedResume(e.target.value);
                  }}
                />

                <DiffViewerComponent
                  currentResume={currentResume}
                  optimizedResume={optimizedResume}
                  splitView={true}
                />
              </Grid>
              <Grid xs={0} md={1} item={true}></Grid>
            </Grid>
          </>
        )}
      </form>
    </>
  );
}

export default Home;
