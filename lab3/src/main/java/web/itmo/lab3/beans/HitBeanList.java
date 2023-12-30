package web.itmo.lab3.beans;

import jakarta.faces.bean.ApplicationScoped;
import jakarta.faces.bean.ManagedBean;
import web.itmo.lab3.checker.HitChecker;
import web.itmo.lab3.database.DBHandler;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;

@ManagedBean(name = "hitDataBean")
@ApplicationScoped
public class HitBeanList implements Serializable {
    private final ArrayList<HitBean> hits;

    public HitBeanList() {
        DBHandler db = new DBHandler();
        this.hits = db.getAllHitChecks();
    }

    private void pushToDB(HitBean bean) {
        DBHandler db = new DBHandler();
        db.addBean(bean);
    }

    public ArrayList<HitBean> getHits () {
        return this.hits;
    }

    public void addHit(float x, float y, float R){
        long start = System.nanoTime();
        boolean resultBool = HitChecker.checkHit(x, y, R);
        String result;

        if (resultBool) {
            result = "Point hits the area";
        } else {
            result = "Point doesn't hit the area";
        }

        LocalDateTime currentTime = LocalDateTime.now();
        double executionTime = (double) (System.nanoTime() - start) * 0.0001;

        HitBean hitBean = new HitBean();
        hitBean.setX(x);
        hitBean.setY(y);
        hitBean.setR(R);
        hitBean.setHit(result);
        hitBean.setExecutionTime(executionTime);
        hitBean.setTimestamp(currentTime);
        this.hits.add(hitBean);
        pushToDB(hitBean);
    }
}
