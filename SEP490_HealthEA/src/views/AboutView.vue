<template>
  <div
    style="
      width: 100%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
    "
  >
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
                src="https://scontent.fhan15-2.fna.fbcdn.net/v/t1.15752-9/467475459_565655482768642_2556762707235799253_n.png?stp=dst-png_s2048x2048&_nc_cat=103&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeE5Fk5h6Sn1KufUgnVbmbSRZKW1W_SqRKJkpbVb9KpEokyuHHbqbR9ITwOfeq6fTn1xHr6JnKhHeshEBtqJnM73&_nc_ohc=9q-Hb_RKHJ0Q7kNvgHVtDgN&_nc_zt=23&_nc_ht=scontent.fhan15-2.fna&oh=03_Q7cD1QGECxFBE1w58a1MCAPfWzRqXDzonbB8Avhd54m7yrRchw&oe=67867579"     />
            </template>
            <a-card-meta title="Vũ Văn Mạnh">
              <template #description>HE161603<br />Fullstack Dev</template>
            </a-card-meta>
          </a-card>
          <a-card hoverable style="width: 240px; height: 350px; margin: 10px">
            <template #cover>
              <img
                alt="example"
                src="https://scontent.fhan15-2.fna.fbcdn.net/v/t1.15752-9/462585691_3982644395390186_339735217677144642_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeGuOh01sWCFF5Ayw6cVxHqjSqdy5YmmFPRKp3LliaYU9H48mEPD3uu20Z4ot-Ta1bB28v0smfOW0y5Eb4OOTtqu&_nc_ohc=O5-ZeWWq4s0Q7kNvgG5HGR5&_nc_zt=23&_nc_ht=scontent.fhan15-2.fna&oh=03_Q7cD1QGVaPMwA0WlS1ZO150zZb9ObZPIxpugbGt20_ItBDJvfQ&oe=67868950"/>
            </template>
            <a-card-meta title="Nguyễn Thùy Dương">
              <template #description>HE171061<br />Project Manager, BE Dev</template>
            </a-card-meta>
          </a-card>
          <a-card hoverable style="width: 240px; height: 350px; margin: 10px">
            <template #cover>
              <img
                alt="example"
                src="https://scontent.fhan15-1.fna.fbcdn.net/v/t1.15752-9/462572165_508226958211683_5128369587572781175_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeF0lucnEc-GbXwAJjFDFjoCA3wntGUYNnQDfCe0ZRg2dCX2R5DpfCknvA1CY9RXrVZMsq2Ay2ZyIPEnBcwRUXg3&_nc_ohc=nFAuTI_tnnsQ7kNvgEB9QGz&_nc_zt=23&_nc_ht=scontent.fhan15-1.fna&oh=03_Q7cD1QEpwDqyYaDW0rWbYXTRN-G0fMKrWcTZxNEdi014rtvp3g&oe=6786963C"
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
                src="https://scontent.fhan15-1.fna.fbcdn.net/v/t1.15752-9/462573215_888057373137791_2038286613432098990_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeEvxJDTn-tmEoM759dUtmRXrEEj5K_5SvSsQSPkr_lK9NOX2jOLU2EL16umR2HVwjveWDp4YIXd2GGfD5FdTG2S&_nc_ohc=_cNwN9ho_rkQ7kNvgEvcaH5&_nc_zt=23&_nc_ht=scontent.fhan15-1.fna&oh=03_Q7cD1QFcy19RrKGM1Xy6jkvLH1GbxvG1E0TnXiKehgFjJmpdww&oe=678695C6"
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
