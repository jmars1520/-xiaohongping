import { useState } from "react";
import "./App.css";

import BottomNav from "./components/shared/BottomNav";
import LoginModal from "./components/shared/LoginModal";
import SupplierHome from "./components/supplier/SupplierHome";
import OrderCreate from "./components/supplier/OrderCreate";
import OrderList from "./components/supplier/OrderList";
import OrderDetail from "./components/supplier/OrderDetail";
import RecycleCenter from "./components/supplier/RecycleCenter";
import MyPage from "./components/supplier/MyPage";
import WalletPage from "./components/supplier/WalletPage";
import PaymentAccountPage from "./components/supplier/PaymentAccountPage";
import InvoicePage from "./components/supplier/InvoicePage";
import ReviewsPage from "./components/supplier/ReviewsPage";
import CertificationPage from "./components/supplier/CertificationPage";
import TaskCenter from "./components/collector/TaskCenter";
import MyTasks from "./components/collector/MyTasks";
import MyIncome from "./components/collector/MyIncome";
import MyProfile from "./components/collector/MyProfile";
import CollectorWithdrawPage from "./components/collector/WithdrawPage";
import CollectorPaymentAccountPage from "./components/collector/PaymentAccountPage";

type Role = "supplier" | "collector";

function App() {
  const [role, setRole] = useState<Role>("supplier");
  const [page, setPage] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isCollector, _setIsCollector] = useState(true); // Simulated: backend designates this user as collector
  const [loginCallback, setLoginCallback] = useState<(() => void) | null>(null);

  const navigate = (target: string) => {
    setPage(target);
  };

  // Check login before performing action, show login modal if not logged in
  const requireLogin = (callback: () => void) => {
    if (isLoggedIn) {
      callback();
    } else {
      setLoginCallback(() => callback);
      setShowLoginModal(true);
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
    if (loginCallback) {
      loginCallback();
      setLoginCallback(null);
    }
  };

  const switchToCollector = () => {
    setRole("collector");
    setPage("tasks");
  };

  const switchToSupplier = () => {
    setRole("supplier");
    setPage("home");
  };

  const renderSupplierPage = () => {
    switch (page) {
      case "home":
        return <SupplierHome onNavigate={navigate} />;
      case "createOrder":
        return <OrderCreate onBack={() => navigate("home")} onRequireLogin={requireLogin} />;
      case "orders":
        return <OrderList onBack={() => navigate("home")} onViewDetail={() => navigate("orderDetail")} />;
      case "orderDetail":
        return <OrderDetail onBack={() => navigate("orders")} />;
      case "recycle":
        return <RecycleCenter />;
      case "mine":
        return (
          <MyPage
            onNavigate={navigate}
            isLoggedIn={isLoggedIn}
            isCollector={isCollector}
            onSwitchToCollector={switchToCollector}
            onLogin={() => {
              setLoginCallback(null);
              setShowLoginModal(true);
            }}
          />
        );
      case "wallet":
        return <WalletPage onBack={() => navigate("mine")} />;
      case "paymentAccount":
        return <PaymentAccountPage onBack={() => navigate("mine")} />;
      case "invoices":
        return <InvoicePage onBack={() => navigate("mine")} />;
      case "reviews":
        return <ReviewsPage onBack={() => navigate("mine")} />;
      case "certification":
        return <CertificationPage onBack={() => navigate("mine")} />;
      default:
        return <SupplierHome onNavigate={navigate} />;
    }
  };

  const renderCollectorPage = () => {
    switch (page) {
      case "tasks":
        return <TaskCenter onNavigate={navigate} />;
      case "myTasks":
        return <MyTasks onBack={() => navigate("tasks")} />;
      case "income":
        return <MyIncome onBack={() => navigate("tasks")} onNavigate={navigate} />;
      case "profile":
        return (
          <MyProfile
            onBack={() => navigate("tasks")}
            onNavigate={navigate}
            onSwitchToSupplier={switchToSupplier}
          />
        );
      case "collectorWithdraw":
        return <CollectorWithdrawPage onBack={() => navigate("income")} />;
      case "collectorPaymentAccount":
        return <CollectorPaymentAccountPage onBack={() => navigate("profile")} />;
      default:
        return <TaskCenter onNavigate={navigate} />;
    }
  };

  const showBottomNav = !["createOrder", "orderDetail", "wallet", "paymentAccount", "invoices", "reviews", "certification", "collectorWithdraw", "collectorPaymentAccount"].includes(page);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Phone Frame */}
      <div className="w-full max-w-md bg-white min-h-screen relative shadow-2xl">
        {role === "supplier" ? renderSupplierPage() : renderCollectorPage()}
        {showBottomNav && (
          <BottomNav
            active={page}
            onNavigate={navigate}
            role={role}
          />
        )}
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal
          onClose={() => {
            setShowLoginModal(false);
            setLoginCallback(null);
          }}
          onLogin={handleLogin}
        />
      )}
    </div>
  );
}

export default App;
