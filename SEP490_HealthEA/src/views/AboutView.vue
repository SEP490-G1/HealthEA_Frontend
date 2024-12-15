<template>
  <div style="width: 100%; display: flex; justify-content: center; flex-direction: column; align-items: center">
    <div
      style="
        background-image: linear-gradient(to top, #00c6fb 0%, #005bea 100%);
        width: 100%;
        height: 50vh;
        display: flex;
        align-items: center;
        justify-content: flex-start;
      "
    >
      <a-typography-title style="margin-left: 200px; color: aliceblue" :level="2"
        >Về chúng tôi
      </a-typography-title>
    </div>
    <div class="aboutus">
      <div>
        <a-typography-title
          style="display: flex; margin: 50px; align-items: center; justify-content: center"
          :level="1"
        >
          Sản phẩm của chúng tôi
        </a-typography-title>
        <a-typography style="display: flex; align-items: center; justify-content: center">
          Đua ra một giải pháp hoàn chỉnh
        </a-typography>
      </div>
      <div style="margin-top: 50px">
        <a-typography-title
          style="display: flex; align-items: center; justify-content: center"
          :level="2"
        >
          Chúng tôi là
        </a-typography-title>
        <div style="display: flex; justify-content: center">
          <a-card hoverable style="width: 240px; height: 350px; margin: 10px">
            <template #cover>
              <img
                alt="example"
                src="https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-6/470159576_1112328304229757_268895775453833859_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGKUHN538NYQcObmZByH3LlhZYx_VTNvj6FljH9VM2-PsElBvGcFHNffnjxpHB7yXgbByvf0DzXhvGnAS1ojbbp&_nc_ohc=OsWi12Xf0iIQ7kNvgG1-i1G&_nc_zt=23&_nc_ht=scontent.fhan20-1.fna&_nc_gid=AO-dwtLIm3w6O08bCSB0DCD&oh=00_AYAl6V7r8Ws5xQM0DMd6zHu-8gu2lZKkILpgcfj6dZJzDQ&oe=67646B19"
              />
            </template>
            <a-card-meta title="Hoàng Thái Thụy">
              <template #description>HE170489<br />Technical leader, Frontend Dev</template>
            </a-card-meta>
          </a-card>
          <a-card hoverable style="width: 240px; height: 350px; margin: 10px">
            <template #cover>
              <img
                alt="example"
                src="https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-6/470159576_1112328304229757_268895775453833859_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGKUHN538NYQcObmZByH3LlhZYx_VTNvj6FljH9VM2-PsElBvGcFHNffnjxpHB7yXgbByvf0DzXhvGnAS1ojbbp&_nc_ohc=OsWi12Xf0iIQ7kNvgG1-i1G&_nc_zt=23&_nc_ht=scontent.fhan20-1.fna&_nc_gid=AO-dwtLIm3w6O08bCSB0DCD&oh=00_AYAl6V7r8Ws5xQM0DMd6zHu-8gu2lZKkILpgcfj6dZJzDQ&oe=67646B19"
              />
            </template>
            <a-card-meta title="Vũ Văn Mạnh">
              <template #description>HE161603<br />Fullstack Dev</template>
            </a-card-meta>
          </a-card>
          <a-card hoverable style="width: 240px; height: 350px; margin: 10px">
            <template #cover>
              <img
                alt="example"
                src="https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-6/470159576_1112328304229757_268895775453833859_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGKUHN538NYQcObmZByH3LlhZYx_VTNvj6FljH9VM2-PsElBvGcFHNffnjxpHB7yXgbByvf0DzXhvGnAS1ojbbp&_nc_ohc=OsWi12Xf0iIQ7kNvgG1-i1G&_nc_zt=23&_nc_ht=scontent.fhan20-1.fna&_nc_gid=AO-dwtLIm3w6O08bCSB0DCD&oh=00_AYAl6V7r8Ws5xQM0DMd6zHu-8gu2lZKkILpgcfj6dZJzDQ&oe=67646B19"
              />
            </template>
            <a-card-meta title="Nguyễn Thùy Dương">
              <template #description>HE171061<br />Project Manager, BE Dev</template>
            </a-card-meta>
          </a-card>
          <a-card hoverable style="width: 240px; height: 350px; margin: 10px">
            <template #cover>
              <img
                alt="example"
                src="https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-6/470159576_1112328304229757_268895775453833859_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGKUHN538NYQcObmZByH3LlhZYx_VTNvj6FljH9VM2-PsElBvGcFHNffnjxpHB7yXgbByvf0DzXhvGnAS1ojbbp&_nc_ohc=OsWi12Xf0iIQ7kNvgG1-i1G&_nc_zt=23&_nc_ht=scontent.fhan20-1.fna&_nc_gid=AO-dwtLIm3w6O08bCSB0DCD&oh=00_AYAl6V7r8Ws5xQM0DMd6zHu-8gu2lZKkILpgcfj6dZJzDQ&oe=67646B19"
              />
            </template>
            <a-card-meta title="Cao Thành Long">
              <template #description>HE170489<br />Fullstack Dev</template>
            </a-card-meta>
          </a-card>
          <a-card hoverable style="width: 240px; height: 350px; margin: 10px">
            <template #cover>
              <img
                alt="example"
                src="https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-6/470159576_1112328304229757_268895775453833859_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGKUHN538NYQcObmZByH3LlhZYx_VTNvj6FljH9VM2-PsElBvGcFHNffnjxpHB7yXgbByvf0DzXhvGnAS1ojbbp&_nc_ohc=OsWi12Xf0iIQ7kNvgG1-i1G&_nc_zt=23&_nc_ht=scontent.fhan20-1.fna&_nc_gid=AO-dwtLIm3w6O08bCSB0DCD&oh=00_AYAl6V7r8Ws5xQM0DMd6zHu-8gu2lZKkILpgcfj6dZJzDQ&oe=67646B19"
              />
            </template>
            <a-card-meta title="Trần Mạnh Hoàng">
              <template #description>HE130937<br />Tester</template>
            </a-card-meta>
          </a-card>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.aboutus {
  width: 80%;
  background-color: white;
  align-items: center;
  justify-content: center;
}
</style>
