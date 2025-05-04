import React from "react";
import { CssVarsProvider, useColorScheme, useTheme } from "@mui/joy/styles";
import {
  Card,
  Grid,
  Sheet,
  Typography,
  Stack,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemContent,
  Divider,
  SvgIcon,
  Button,
  Link,
  ButtonGroup,
} from "@mui/joy";
import {
  LineChart,
  PieChart,
  Line,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import {
  ArrowUpward,
  ArrowDownward,
  Savings,
  Paid,
  PieChart as PieChartIcon,
  Download,
} from "@mui/icons-material";
import {
  ArrowUpwardRounded,
  ArrowDownwardRounded,
  AccountBalanceWalletRounded,
  ShoppingCartRounded,
  FastfoodRounded,
  SavingsRounded,
} from "@mui/icons-material";
import { AiOutlineCalendar, AiOutlineTransaction } from "react-icons/ai";
import { useMediaQuery } from "@mui/material";
import Xarrow from "react-xarrows";
import { ReactComponent as Arrow } from "../arrow-trend-down-svgrepo-com (5).svg";
import { Link as RouterLink } from "react-router";

const getMonthDateRange = () => {
  const currentDate = new Date();

  // Get first day of month
  const firstDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );

  // Get last day of month
  const lastDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  // Format options
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return `${firstDay.toLocaleDateString(
    undefined,
    options
  )} - ${lastDay.toLocaleDateString(undefined, options)}`;
};

const Overview = () => {
  const { mode, setMode } = useColorScheme();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery(theme.breakpoints.down("md"));
  console.log(new Date().getMonth(), new Date().getFullYear());

  const transactions = [
    {
      id: 1,
      amount: -150.0,
      description: "Grocery Shopping",
      category_id: 1,
      date: "2023-07-15",
    },
    {
      id: 2,
      amount: 2500.0,
      description: "Salary Deposit",
      category_id: 4,
      date: "2023-07-14",
    },
    {
      id: 3,
      amount: -45.0,
      description: "Netflix Subscription",
      category_id: 3,
      date: "2023-07-13",
    },
  ];

  const categories = [
    { id: 1, name: "Food" },
    { id: 2, name: "Utilities" },
    { id: 3, name: "Entertainment" },
    { id: 4, name: "Income" },
  ];

  const budgets = [
    { id: 1, category_id: 1, amount: 500.0, period: "monthly", spent: 420.0 },
    { id: 2, category_id: 3, amount: 100.0, period: "monthly", spent: 85.0 },
    { id: 2, category_id: 3, amount: 100.0, period: "monthly", spent: 85.0 },
    { id: 2, category_id: 3, amount: 100.0, period: "monthly", spent: 85.0 },
    { id: 2, category_id: 3, amount: 100.0, period: "monthly", spent: 85.0 },
  ];

  const spendingData = categories
    .map((category) => ({
      name: category.name,
      value: transactions
        .filter((t) => t.category_id === category.id && t.amount < 0)
        .reduce((sum, t) => sum + Math.abs(t.amount), 0),
    }))
    .filter((d) => d.value > 0);

  const totalIncome = transactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const arrowProps = {
    component: Arrow,
    inheritViewBox: true,
    sx: {
      color: "green",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2,
      fontSize: "large",
      transform: "rotate(-80deg)",
    },
  };
  const arrowProps1 = {
    component: Arrow,
    inheritViewBox: true,
    sx: {
      color: "red",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2,
      fontSize: "large",
      transform: "rotate(0deg)",
    },
  };

  return (
    <CssVarsProvider>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <Stack
            direction={isSmall ? "column" : "row"}
            justifyContent="space-between"
            alignItems="center"
            gap={1}
          >
            <Stack direction="column">
              <Typography level="h2" fontFamily={"monospace"}>
                Financial Dashboard
              </Typography>
              <Typography fontFamily={"monospace"}>
                This is your overview for the month.
              </Typography>
            </Stack>

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Chip variant="soft" startDecorator={<AiOutlineCalendar />}>
                <Typography fontFamily={"monospace"}>
                  {getMonthDateRange()}
                </Typography>
              </Chip>
            </Stack>
          </Stack>
          <Divider sx={{ m: 2 }} />
        </Grid>
        <Stack direction={"column"} display={"flex"} width={"100%"}>
          <Grid xs={12} md={12}>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              width={"100%"}
              display={"flex"}
              justifyContent={"flex-start"}
            >
              <Savings fontSize="large" />
              <Grid>
                <Typography fontFamily={"monospace"} level="body-sm">
                  Net Balance
                </Typography>
                <Typography level="h3" fontFamily={"monospace"}>
                  ${(totalIncome - totalExpenses).toFixed(2)}
                </Typography>
              </Grid>
            </Stack>
          </Grid>

          <Grid
            sx={{ display: "flex", flexDirection: isSmall ? "column" : "row" }}
            width={"100%"}
          >
            <Grid xs={12} md={6}>
              <Card variant="outlined" color="success">
                <Stack direction="row" spacing={2} alignItems="center">
                  <SvgIcon {...arrowProps} />{" "}
                  <div>
                    <Typography level="body-sm" fontFamily={"monospace"}>
                      Total Income
                    </Typography>
                    <Typography level="h3" fontFamily={"monospace"}>
                      ${totalIncome.toFixed(2)}
                    </Typography>
                  </div>
                </Stack>
              </Card>
            </Grid>

            <Grid xs={12} md={6}>
              <Card variant="outlined" color="danger">
                <Stack direction="row" spacing={2} alignItems="center">
                  <SvgIcon {...arrowProps1} />{" "}
                  <div>
                    <Typography level="body-sm" fontFamily={"monospace"}>
                      Total Expenses
                    </Typography>
                    <Typography level="h3" fontFamily={"monospace"}>
                      ${totalExpenses.toFixed(2)}
                    </Typography>
                  </div>
                </Stack>
              </Card>
            </Grid>
          </Grid>
          <Divider sx={{ m: 2 }} />
        </Stack>
        <Grid xs={12} md={6}>
          <Card>
            <Stack direction="row" spacing={1} alignItems="center" mb={2}>
              <PieChartIcon />
              <Typography level="h4" fontFamily={"monospace"}>
                Spending by Category
              </Typography>
            </Stack>
            <div style={{ height: "300px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={spendingData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                  >
                    {spendingData.map((entry, index) => (
                      <Cell key={index} fill={`hsl(${index * 70}, 70%, 50%)`} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Grid>

        <Grid xs={12} md={6}>
          <Card>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              mb={2}
              justifyContent={"space-between"}
              height={"100%"}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <Paid />
                <Typography level="h4" fontFamily={"monospace"}>
                  Budget Progress
                </Typography>
              </Stack>

              <Link
                component={RouterLink}
                to="/budgets"
                fontFamily="monospace"
                sx={{
                  fontSize: "0.7rem",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                View all
              </Link>
            </Stack>
            {budgets.slice(0, 4).map((budget) => {
              const category = categories.find(
                (c) => c.id === budget.category_id
              );
              const progress = (budget.spent / budget.amount) * 100;

              return (
                <div key={budget.id} style={{ marginBottom: "1rem" }}>
                  <Stack direction="row" justifyContent="space-between" mb={1}>
                    <Typography fontFamily={"monospace"}>
                      {category?.name}
                    </Typography>
                    <Typography>
                      ${budget.spent.toFixed(2)} / ${budget.amount.toFixed(2)}
                    </Typography>
                  </Stack>
                  <LinearProgress
                    determinate
                    value={Math.min(progress, 100)}
                    color={progress > 100 ? "danger" : "primary"}
                    sx={{ "--LinearProgress-thickness": "12px" }}
                  />
                </div>
              );
            })}
          </Card>
        </Grid>
        <Grid xs={12} md={6}>
          <Card>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              mb={2}
              justifyContent={"space-between"}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <Paid />
                <Typography level="h4" fontFamily={"monospace"}>
                  This month's report
                </Typography>
              </Stack>

              <Link
                component={RouterLink}
                to="/budgets"
                fontFamily="monospace"
                sx={{
                  fontSize: "0.7rem",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                View all
              </Link>
            </Stack>
            <Divider>
              {" "}
              <Chip>
                {new Date().toLocaleDateString(undefined, {
                  month: "long",
                  year: "numeric",
                })}
              </Chip>
            </Divider>
            <Grid flexDirection={"row"}>
              <Button
                sx={{
                  justifySelf: "center",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Download /> Download report
              </Button>
            </Grid>
          </Card>
        </Grid>
        <Grid xs={12}>
          <Card>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={1}
              sx={{ width: "100%" }}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <AiOutlineTransaction />
                <Typography level="h4" fontFamily="monospace">
                  Recent Transactions
                </Typography>
              </Stack>

              <Link
                component={RouterLink}
                to="/transactions"
                fontFamily="monospace"
                sx={{
                  fontSize: "0.8rem",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                View all
              </Link>
            </Stack>

            <List>
              {transactions.map((transaction) => {
                const category = categories.find(
                  (c) => c.id === transaction.category_id
                );
                return (
                  <React.Fragment key={transaction.id}>
                    <ListItem>
                      <ListItemContent>
                        <Typography fontFamily={"monospace"}>
                          {transaction.description}
                        </Typography>
                        <Typography level="body-sm" fontFamily={"monospace"}>
                          {category?.name}
                        </Typography>
                      </ListItemContent>
                      <Chip
                        variant="soft"
                        color={transaction.amount > 0 ? "success" : "danger"}
                        startDecorator={
                          transaction.amount > 0 ? (
                            <ArrowUpward />
                          ) : (
                            <ArrowDownward />
                          )
                        }
                      >
                        ${Math.abs(transaction.amount).toFixed(2)}
                      </Chip>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                );
              })}
            </List>
          </Card>
        </Grid>
      </Grid>
    </CssVarsProvider>
  );
};

export default Overview;
