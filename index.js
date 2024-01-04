const app = Vue.createApp({
  data() {
    return {
      currentDate: new Date(),
      selectedDate: null,
    };
  },
  computed: {
    daysInMonth() {
      const year = this.currentDate.getFullYear();
      const month = this.currentDate.getMonth() + 1;
      return new Date(year, month, 0).getDate();
    },
    startDayOfWeek() {
      const year = this.currentDate.getFullYear();
      const month = this.currentDate.getMonth();
      return new Date(year, month, 1).getDay();
    },
  },
  methods: {
    isSelected(day) {
      return (
        this.selectedDate &&
        this.selectedDate.getFullYear() === this.currentDate.getFullYear() &&
        this.selectedDate.getMonth() === this.currentDate.getMonth() &&
        this.selectedDate.getDate() === day
      );
    },
    selectDate(day) {
      this.selectedDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day);
    },
    prevMonth() {
      this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    },
    nextMonth() {
      this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    },
  },
  template: `
    <div class="calendar">
      <div>
        <button @click="prevMonth">&lt;</button>
        {{ currentDate.toLocaleString('default', { month: 'long', year: 'numeric' }) }}
        <button @click="nextMonth">&gt;</button>
      </div>
      <div class="days">
        <div v-for="n in startDayOfWeek" :key="n"></div>
        <div v-for="day in daysInMonth" :key="day" @click="selectDate(day)" :class="{ 'day': true, 'selected': isSelected(day) }">{{ day }}</div>
      </div>
    </div>
  `,
});

app.mount('#app');
