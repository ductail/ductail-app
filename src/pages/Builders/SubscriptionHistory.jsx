import React from "react";
import Layout from "../../layout/Layout";
import ProjectBanner from "../../layout/ProjectBanner";
import SubscriptionHistoryTile from "../../layout/Subscription/SubscriptionHistoryTile";




const SubscriptionHistory = () => {
  return (
    <div style={{ backgroundColor: "#E0E0E0" }}>
      <Layout>
        <div>
          <ProjectBanner
            title="Subscription History"
            imageUrl="https://via.placeholder.com/1200x300"
          />
        </div>
        <SubscriptionHistoryTile />
      </Layout>
    </div>
  );
};


export default SubscriptionHistory;
